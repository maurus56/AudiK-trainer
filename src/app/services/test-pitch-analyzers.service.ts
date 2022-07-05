import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestPitchAnalyzersService {

  constructor() { }




  // -- Possible stream pitch analyzer

//   if ("mediaDevices" in navigator) {
//     navigator.mediaDevices
//       .getUserMedia({ audio: true })
//       .then(
//           stream => {
//             audioContext.createMediaStreamSource(stream).connect(analyser);

//             const arrayUInt = new Uint8Array(analyser.frequencyBinCount);
//             analyser.getByteTimeDomainData(arrayUInt);
      
//             setInterval(() => {
//               const array32 = new Float32Array(analyser.fftSize);
//               analyser.getFloatTimeDomainData(array32);
//               console.log(array32);
      
//               const pitch = detectPitch(array32);
              
//               console.log(pitch);
//             }, 500);
//           })
//       .catch(() => {});
// } 

}
