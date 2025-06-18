const colors = {
  primary: '#3b82f6',
  primaryDark: '#1e40af',
  primaryLight: '#93c5fd',
  yellow: '#FFD761',
  paleSky: '#E5F0FB',
  indigo: '#1D3557',
  creamWhite: '#FFFDF8',
  mutedBlueGray: '#B7C9D4',
  white: '#ffffff',
}
function hexToRgb(hex){
  hex=hex.replace('#','');
  if(hex.length===3) hex=hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
  const int=parseInt(hex,16);
  return [int>>16 & 255, int>>8 & 255, int & 255];
}
function luminance([r,g,b]){
  const sr=[r,g,b].map(c=>{
    c/=255;
    return c<=0.03928? c/12.92: Math.pow((c+0.055)/1.055,2.4);
  });
  return 0.2126*sr[0]+0.7152*sr[1]+0.0722*sr[2];
}
function contrast(a,b){
  const l1=luminance(hexToRgb(a));
  const l2=luminance(hexToRgb(b));
  const [bright,dark]=l1>l2?[l1,l2]:[l2,l1];
  return (bright+0.05)/(dark+0.05);
}
function check(name, text, bg){
  const ratio=contrast(colors[text], colors[bg]).toFixed(2);
  console.log(`${name} text:${text} bg:${bg} ratio:${ratio}`);
}
check('White on primary','white','primary');
check('Yellow on indigo','yellow','indigo');
check('Indigo on yellow','indigo','yellow');
check('Indigo on creamWhite','indigo','creamWhite');
check('CreamWhite on indigo','creamWhite','indigo');
check('PrimaryDark on creamWhite','primaryDark','creamWhite');
