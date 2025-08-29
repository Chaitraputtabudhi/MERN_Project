// Add your imports here


/*
    Set Base_URL to the URL of the browser in the right pane ==>
    Note: Sample value has been set for your reference only. 
    Replace "81eqeq94rnq2n.educative.run/" with the copied URL 
*/

// Note the "/" at the end of the URL. Dont remove it yourself.
let Base_URL = "81eqeq94rnq2n.educative.run/";
Base_URL = Base_URL.replace(/\/$/, "");

// Use the Final_URL when you need to set URL for axios GET request
const Final_URL= "https://"+Base_URL+":3000";

// Write your code here