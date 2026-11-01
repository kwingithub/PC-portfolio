// Local file import, based on the documented pyNCMDUMP container format.
// https://github.com/allenfrostline/pyNCMDUMP
const fs=require('node:fs'),crypto=require('node:crypto'),path=require('node:path');
const [source,target]=process.argv.slice(2);if(!source||!target)throw Error('Usage: node import-ncm.cjs input.ncm output-directory');
const data=fs.readFileSync(source);if(data.subarray(0,8).toString()!=='CTENFDAM')throw Error('Not an NCM file');
let pos=10;const u32=()=>{const n=data.readUInt32LE(pos);pos+=4;return n;};
const read=n=>{if(pos+n>data.length)throw Error('Truncated file');const b=data.subarray(pos,pos+n);pos+=n;return b;};
const xor=(b,k)=>Buffer.from(b.map(v=>v^k));
const decrypt=(b,key)=>{const c=crypto.createDecipheriv('aes-128-ecb',Buffer.from(key,'hex'),null);return Buffer.concat([c.update(b),c.final()]);};
const key=decrypt(xor(read(u32()),0x64),'687A4852416D736F356B496E62617857').subarray(17);
const box=Array.from({length:256},(_,i)=>i);let last=0;
for(let i=0;i<256;i++){const j=(box[i]+last+key[i%key.length])&255;[box[i],box[j]]=[box[j],box[i]];last=j;}
const metaRaw=xor(read(u32()),0x63).subarray(22).toString();
const meta=JSON.parse(decrypt(Buffer.from(metaRaw,'base64'),'2331346C6A6B5F215C5D2630553C2728').toString().slice(6));
pos+=5;const frameLength=u32();const image=read(u32());pos+=frameLength-image.length;const audio=Buffer.from(data.subarray(pos));
for(let i=0;i<audio.length;i++){const j=(i+1)&255;audio[i]^=box[(box[j]+box[(box[j]+j)&255])&255];}
if(!['mp3','flac'].includes(meta.format))throw Error('Unsupported format '+meta.format);
fs.mkdirSync(target,{recursive:true});fs.writeFileSync(path.join(target,'ditto.'+meta.format),audio);
if(image.length){const ext=image[0]===0x89?'png':'jpg';fs.writeFileSync(path.join(target,'ditto-cover.'+ext),image);}
console.log(JSON.stringify({format:meta.format,title:meta.musicName,artist:meta.artist,album:meta.album,duration:meta.duration,bytes:audio.length,coverBytes:image.length}));
