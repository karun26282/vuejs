import Errors from './Errors';

class Form {

    constructor(data) {

        this.originalData = data;

        for(let field in data){

            this[field] = data[field];

        }
         this.errors = new Errors();
    }

    data(){

        let data = {};

        for(let property in this.originalData){
            data[property] = this[property];
        }

        return data;
    }

    reset(){
        for (let field in data){
            this[field] = '';
        }
        this.errors.clear();
    }

    submit(requestType, url){
        axios[requestType](url, this.data())
            .then(this.onSuccess.bind(this))
            .catch(this.onFail.bind(this))
    }

    onSuccess(response){
        alert(response.data.message);

        this.reset();
    }

    onFail(error){
        this.form.errors.record(error.response.data);
    }

}

export default Form;
