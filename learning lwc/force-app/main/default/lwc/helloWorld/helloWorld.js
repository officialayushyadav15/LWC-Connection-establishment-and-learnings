import { LightningElement, track } from 'lwc';

export default class HelloWorld extends LightningElement {
    name // by default undefined
    age = 30;
    fullname = "Ayush Yadav"
    showData = true 
    details = {
        name: "Ayush",
        age: 21,
        city: "Hyderabad"
    }
    userList = [1,2,3,4,5,6,7,8,9,0]

    // all of the above mentioned properties are the local properties

    //methods can be called using htlm or using the js itself

    // getName(){
    //     //perform my logic
    // }
    // we always use this keyword to access any property

    fullnameis = "Ayush Yadav"
    title = "LWC"
    changeHandler(event){
        this.title = event.target.value
    }

    // track used to updated nested properties without hastle
    @track address = {
        city: "Hyderabad",
        state: "Telangana",
        country: "India"
    }

    trackchangeHandler(event){
        this.address.city = event.target.value
    }

}