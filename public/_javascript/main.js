

const confirmSubmit =(event, form)=>{
    
    event.preventDefault();
    const confirmed = confirm("Are you sure?");

    confirmed ? form.submit() : "";

}