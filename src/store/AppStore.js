import { observable, makeObservable, action } from 'mobx';
class AppStore {
      

    isLogin = JSON.parse(localStorage.getItem("Admin"));
    isEdit = false;
    listOrders=[];
    services
      = [
        {
          name: "הקלטת שיר",
          description: "מתאים לבר/בת מצווה + קליפ",
          price: "120לשעה"
        },
        {
          price: "100 לשעה",
          name: "קריינות",
          description: "קריינות מיקצועית ע''י קריינים מקצוענים",
        },
        {
          price: "150 לשעה",
          name: "עיבוד מוזיקלי",
          description: "עיבוד מקצועי לשיר סקיצה שלך",
        },
        {
          price: "2300",
          name: "קורס פיתוח קול",
          description:" ע'י מורים מספר 1 בארץ",
    
        },
        
        
      ];
      listBusinessData = {
        name: "STUDIO",
        address:"סוקולוב 58 רמת גן",
        phone: "03-9445378",
        owner: "Admin",
        description: "אולפן מקצועי - הכשרה מוזיקלית",
    }
    constructor() {
        makeObservable(this, {
            isLogin: observable,
            setIsLogin: action,
            isEdit: observable,
            services: observable,
            getService:action,
            addService:action,
            listBusinessData:observable,
            postBusinessData:action,
            getBusinessData:action,
            listOrders:observable,
            postOrders:action,
            getOrders:action,
        })
        const fetchBusinessDataExists = async () => {
          const bus = await this.getBusinessData();
          if (Object.keys(bus).length === 0)
          {
            this.postBusinessData(this.listBusinessData); 
          }
          else{
            this.listBusinessData = bus;
          }
        }
        fetchBusinessDataExists();
        const fetchServicesExists = async () => {
            const ser = await this.getService();
            // console.log("befor post",ser)
            if (ser.length === 0){
               
              this.services.forEach((service) => this.addInitialService(service)); 
            }
            else{
              this.services = ser;
            }
          }
          fetchServicesExists();

    }

    setIsLogin = (val) => {
        this.isLogin = val;
    }
    setIsEdit = (val) => {
        this.isEdit = val;
    }
    getService = async () => {
  
        const response = await fetch("http://localhost:8787/services");
        const data = await response.json();
        if(data.length!==0){
          this.services=data;
        }
        console.log("befor post",data)
        return data;
      }
      addInitialService = async (newService) => {
        const response1 = await fetch("http://localhost:8787/service", {
          method: "POST",
          body: JSON.stringify(newService),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response1.status === 200) {
          //this.services = ([...this.services, newService])
          console.log("post",this.services)
          return
        }
        return
        
      }

      addService=async(service)=>{
        const response = await fetch("http://localhost:8787/service", {
            method: "POST",
            body: JSON.stringify(service),
            headers: {
              "Content-Type": "application/json",
            },
          });
           if (response.status === 200) {
            console.log("post",this.services)
           this.services = ([...this.services, service])
       }
      }
      postBusinessData =async(businessData)=>{
        const response = await fetch("http://localhost:8787/businessData", {
         method: "POST",
         body: JSON.stringify(businessData),
         headers: {
           "Content-Type": "application/json",
         },
       });
       if(response.status===200){
         this.listBusinessData=businessData;
     }
   }
     getBusinessData = async () => {
       const response = await fetch("http://localhost:8787/businessData")
       if (response.status === 200) {
         const business = await response.json();
         return business; 
       } else {
         return null; 
       }
     };
     postOrders=async (ord) => {
      let order = {
        name:ord["username"],
        identity:ord["identity"],
        type:ord["type"],
        dateTime:ord["deliveryDate"],
        email:ord["email"],
        phone:ord["phone"],
        address:ord["address"]
      }
      const responses = await fetch("http://localhost:8787/appointment", {
        method: "POST",
        body: JSON.stringify(order),
        headers: {
          "Content-Type": "application/json",
        },
      });
     if(responses.status===200){
       this.listOrders=([...this.listOrders,order])
    }
  }
  
  getOrders=async () => {
    const response = await fetch("http://localhost:8787/appointments");
    const data = await response.json();
    this.listOrders =[...data].sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
  }
  }

export default new AppStore();