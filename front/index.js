const postData = async ()=>{
    try {
      const response = await fetch('http://localhost:8080/upload',{
        method: 'POST',
      });
      console.log(d);
    } catch (error) {
        copnsole.error(error);
    }
}