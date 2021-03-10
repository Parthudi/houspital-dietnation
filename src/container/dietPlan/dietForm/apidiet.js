
export const apiDiet = async (userID, token) => {
        const response =  await fetch(`http://localhost:4000/user/getdiet/${userID}`, {
                 method: 'GET',
                 headers: {
                     'Content-Type': 'application/json',
                     "Authorization" : `Bearer ${token}`
                     },
             })
            return await response.json();
     }

// export const apiDiet = async (BMI) => {
//     if( BMI < 18.4) {
//         const response =  await fetch('http://localhost:4000/user/getdiet/602789611092ee90a07548bb',{
//                  method: 'GET',
//                  headers: {
//                      'Content-Type': 'application/json'
//                      },
//              })
//             console.log(response)
//           return await response.json();
//          }

//      if( 25 <= BMI && BMI < 40 ) {
//          const response = await fetch('http://localhost:4000/user/getdiet/60278ee0da74d8755c055e23',{
//              method: 'GET',
//              headers: {
//                  'Content-Type': 'application/json'
//                  },
//          })
//          console.log(response)
//          return await response.json();
            
//         }

//      if( 40 <= BMI ) {
//          const response = await fetch('http://localhost:4000/user/getdiet/60279ab0afe6d96dd4da2c35',{
//              method: 'GET',
//              headers: {
//                  'Content-Type': 'application/json'
//                  },
//          })
//          console.log(response)
//          return await response.json();
     
//         }
// }


// export const ShowImage = (props) => {
//     if( props.BMI < 18.4) {

//     const IMG = `http://localhost:4000/user/getdiet/photo/602789611092ee90a07548bb`
//     return(
//     <div >
//         <img src={IMG} alt="Diet Pic"  style={{width:"600px", height:"250px", borderRadius: '10%'}}/>
//     </div>
//       )
//     }

//     if( 25 <= props.BMI && props.BMI < 40 ) {
//         const IMG = `http://localhost:4000/user/getdiet/photo/60278ee0da74d8755c055e23`
//         return(
//         <div >
//             <img src={IMG} alt="Diet Pic"  style={{width:"600px", height:"250px", borderRadius: '10%'}}/>
//         </div>
//           )
//     }

//     if( 40 <= props.BMI ) {
//         const IMG = `http://localhost:4000/user/getdiet/photo/60279ab0afe6d96dd4da2c35`
//         return(
//         <div >
//             <img src={IMG} alt="Diet Pic"  style={{width:"600px", height:"250px", borderRadius: '10%'}}/>
//         </div>
//           )
//     }
//  }