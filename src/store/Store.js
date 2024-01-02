
import { observable, makeObservable, action } from 'mobx';

class Store{

  constructor() {
    makeObservable(this, {
    
    })}
    /////////////////////////services///////////////////////////


    // addService=async(service)=>{
    //     const response = await fetch("http://localhost:8787/service", {
    //         method: "POST",
    //         body: JSON.stringify(service),
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //       });
    //        if (response.status === 200) {
    //        AppStore.services = ([...AppStore.services, service])
    //    }
    //   }
           
}
export default new Store