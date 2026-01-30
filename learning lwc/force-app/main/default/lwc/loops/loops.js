import { LightningElement } from 'lwc';

export default class Loops extends LightningElement {

    cars = ["audi", "bmw", "maruti", "honda", "tata", "hyundai", "suzuki", "toyota"];

    ceoList = [
        { id: 1, name: "Ayush", age: 21, city: "Hyderabad" },
        { id: 2, name: "Yadav", age: 22, city: "Delhi" },
        { id: 3, name: "Salesforce", age: 23, city: "Bangalore" },
        { id: 4, name: "Aman", age: 24, city: "Mumbai" },
        { id: 5, name: "Rohit", age: 25, city: "Pune" },
        { id: 6, name: "Neha", age: 26, city: "Chennai" },
        { id: 7, name: "Priya", age: 27, city: "Kolkata" },
        { id: 8, name: "Rahul", age: 28, city: "Noida" },
        { id: 9, name: "Karan", age: 29, city: "Gurgaon" },
        { id: 10, name: "Sneha", age: 30, city: "Jaipur" }
    ];
}
