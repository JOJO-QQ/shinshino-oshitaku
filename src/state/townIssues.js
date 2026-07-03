// ── 町の課題・建設ロジック ─────────────────────────────────────
// index.html(v5) 行2133-2277 から移設。グローバルstate参照を引数sに変更した以外は無変更。
import {STAGES, stageIndexById} from '../data/stages.js';

export function issueExists(list,id){return (list||[]).some(x=>x.id===id);}

export function addTownIssue(s,issue){
  if(!Array.isArray(s.townIssues))s.townIssues=[];
  if(s.townIssues.some(x=>x.id===issue.id))return;
  s.townIssues.push(issue);
}

export function completeDueConstructions(s,today){
  let changed=false;
  if(!Array.isArray(s.townIssues))s.townIssues=[];
  if(!Array.isArray(s.buildings))s.buildings=[];
  if(!Array.isArray(s.completedConstructions))s.completedConstructions=[];
  s.townIssues.forEach(issue=>{
    if(issue.state==='constructing'&&issue.completeOn&&new Date(issue.completeOn)<=new Date(today)){
      if(issue.type==='burned-house'){
        issue.state='repaired';
        issue.completedOn=today;
        s.buildings[issue.stageIdx??0]=true;
        s.completedConstructions.push({id:`done-${issue.id}-${today}`,type:'home',stageIdx:issue.stageIdx??0,icon:'🏠',title:'おうちができたよ！',body:'まちがなおったね',buildingIcon:'🏠'});
        changed=true;
      }else if(issue.type==='police-risk'&&issue.buildStep==='lot'){
        issue.state='lot';
        issue.requiredVehicle='crane';
        issue.completedOn=today;
        s.completedConstructions.push({id:`done-${issue.id}-lot-${today}`,type:'lot',stageIdx:issue.stageIdx??0,icon:'🚧',title:'よていちができたよ！',body:'つぎはくれーんしゃだよ',buildingIcon:'🚧'});
        changed=true;
      }else if(issue.type==='police-risk'&&issue.buildStep==='station'){
        issue.id='police-station';
        issue.type='police-station';
        issue.state='built';
        issue.requiredVehicle=null;
        issue.completedOn=today;
        s.buildings[issue.stageIdx??0]=true;
        s.completedConstructions.push({id:`done-police-station-${today}`,type:'police',stageIdx:issue.stageIdx??0,icon:'🏢',title:'けいさつしょができたよ！',body:'まちをまもれるね',buildingIcon:'🏢'});
        changed=true;
      }
    }
  });
  return changed;
}

export function syncStoryIssues(s){
  const issues=Array.isArray(s.townIssues)?s.townIssues:[];
  const add=(issue)=>{if(!issueExists(issues,issue.id))issues.push(issue);};
  const policeIdx=stageIndexById('police'), ambuIdx=stageIndexById('ambu'), taxiIdx=stageIndexById('taxi');
  if(policeIdx>=0&&s.stage>policeIdx&&!issueExists(issues,'police-station')){
    add({id:'police-risk',type:'police-risk',state:'risk',createdBy:'police',requiredVehicle:'bull',stageIdx:policeIdx});
  }
  if(ambuIdx>=0&&s.stage>ambuIdx)add({id:'hospital-needed',type:'hospital-needed',state:'needed',createdBy:'ambu',requiredVehicle:'crane',stageIdx:ambuIdx});
  if(taxiIdx>=0&&s.stage>taxiIdx)add({id:'transit-needed',type:'transit-needed',state:'needed',createdBy:'taxi',requiredVehicle:'bus',stageIdx:taxiIdx});
  s.townIssues=issues;
}

export function addPoliceRiskIssue(s,stageIdx){
  addTownIssue(s,{id:'police-risk',type:'police-risk',state:'risk',createdBy:'police',requiredVehicle:'bull',stageIdx});
}

export function addHospitalNeededIssue(s,stageIdx){
  addTownIssue(s,{id:'hospital-needed',type:'hospital-needed',state:'needed',createdBy:'ambu',requiredVehicle:'crane',stageIdx});
}

export function addTransitNeededIssue(s,stageIdx){
  addTownIssue(s,{id:'transit-needed',type:'transit-needed',state:'needed',createdBy:'taxi',requiredVehicle:'bus',stageIdx});
}

export function addBurnedHouseIssue(s,stageIdx){
  addTownIssue(s,{
    id:`burned-house-${stageIdx}`,
    type:'burned-house',
    state:'burned',
    createdBy:STAGES[stageIdx]?.id||'fire',
    requiredVehicle:'excav',
    stageIdx
  });
}

export function hasVehicle(s,id){
  const idx=STAGES.findIndex(x=>x.id===id);
  return idx>=0&&s.stage>idx;
}

export function shouldRepeatPoliceEvent(s){
  const policeIdx=stageIndexById('police');
  if(policeIdx<0||s.stage<=policeIdx)return false;
  const stationBuilt=(s.townIssues||[]).some(issue=>issue.type==='police-station'&&issue.state==='built');
  return !stationBuilt;
}
