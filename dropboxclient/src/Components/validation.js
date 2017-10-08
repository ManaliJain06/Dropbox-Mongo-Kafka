/**
 * Created by ManaliJain on 9/30/17.
 */

export const signup = (data) => {
        let msg = "";
        let check = document.getElementById('agree').checked;
        const namePattern = /^[a-zA-Z\s]+$/;
        const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        const passwordPattern = /^([a-zA-Z0-9@*#]{8,14})$/;

        if(data.firstName ==='' || data.lastName ==='' || data.email ==='' || data.password ===''){
            msg = "All fields are mandatory. Please fill all details";
            return msg;
        }
        if (!(namePattern.test(data.firstName))) {
            msg = "Enter correct First Name";
            return msg;
        }

        if(!(namePattern.test(data.lastName))){
            msg = "Enter correct Last Name";
            return msg;
        }
        //Just to bypass the front login
        // if (!(emailPattern.test(data.email))) {
        //     msg = "Enter correct email address";
        //     return msg;
        // }
        // if (data.password.length<8 || data.password.length>14) {
        //     msg = "Password must be 8 to 15 character long";
        //     return msg;
        // }
        // if (!(passwordPattern.test(data.password))) {
        //         msg = "Password should contain one small letter, \n one capital letter, one digit \nand one special character ";
        //         return msg;
        // }
        if(!check){
                msg="please select terms and condition";
                return msg;
        }

        return msg;
};

export const login = (data) => {
            let msg = "";
            const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
            // const passwordPattern = /^[a-zA-z0-9]\d[8]/;

            if( data.email ==='' || data.password ===''){
                msg = "All fields are mandatory. Please fill all details";
                return msg;
            }
            // if (!(emailPattern.test(data.email))) {
            //     msg = "Enter correct email";
            //     return msg;
            // }
            return msg;
};

export const interest = (data) => {
    let msg = "";
    const pattern = /^[a-zA-Z0-9,\s]+$/;

    if(data.music !== ''){
        if (!(pattern.test(data.music))) {
            msg = "Enter correct music data";
            return msg;
        }
    }

    if(data.sports !== ''){
        if (!(pattern.test(data.sports))) {
            msg = "Enter correct sports data";
            return msg;
        }
    }
    if(data.shows !== ''){
        if (!(pattern.test(data.shows))) {
            msg = "Enter correct shows data";
            return msg;
        }
    }
    return msg;
};

export const about = (data) => {
    let msg = "";
    const pattern = /^[a-zA-Z0-9,\s]+$/;
    const phonePattern = /^\+[1][\s-(]?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}/;


    if(data.work !== ''){
        if (!(pattern.test(data.work))) {
            msg = "Enter correct music data";
            return msg;
        }
    }

    if(data.education !== ''){
        if (!(pattern.test(data.education))) {
            msg = "Enter correct music data";
            return msg;
        }
    }

    if(data.phone !== ''){
        if (!(phonePattern.test(data.phone))) {
            msg = "Enter correct contact number";
            return msg;
        }
    }
    if(data.events !== ''){
        if (!(pattern.test(data.events))) {
            msg = "Enter correct shows data";
            return msg;
        }
    }
    return msg;
};

export const folderName = (data) => {
    let msg = "";

    if(data.dir_name === ''){
            msg = "Enter Folder name";
            return msg;
    }
    return msg;
};