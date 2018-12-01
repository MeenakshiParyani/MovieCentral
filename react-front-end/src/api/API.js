const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'

const headers = {
    'Accept': 'application/json'
};


//Sample




//************************************************************************************************
/*payload = {
email
password
type - (this should be user or admin)
}*/

export const doLogin = (payload) =>
    fetch(`${api}/user/login`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
        credentials:'include'
    }).then(res => {
         console.log(res);
        return res.json();
    })
    .catch(error => {
        console.log("This is error");
        return error;
    });


//************************************************************************************************
//payload = {
//email
//password
//}
export const doRegister = (payload) =>
 fetch(`${api}/user/register`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
        credentials:'include'
    }).then(res => {
        return res.json();
    })
    .catch(error => {
        console.log("This is error");
        return error;
    });

//************************************************************************************************

export const doLogout = (payload) =>
    fetch(`${api}/user/logout`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        //body: JSON.stringify(payload),
        credentials:'include'
    }).then(res => {
        console.log(res);
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });



//************************************************************************************************
//payload = {
//email
//password
//}
export const gethistory = () =>
    fetch(`${api}/user/bookinghistory`, {
        method: 'get',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
       // body: JSON.stringify(payload),
        credentials:'include'
    }).then(res => {
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

//************************************************************************************************

export const getAllUsers = () =>
    fetch(`${api}/admin/getallusers`, {
        method: 'get',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        //body: JSON.stringify(payload),
        credentials:'include'
    }).then(res => {
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });



//************************************************************************************************
export const deleteUser = (payload) =>
    fetch(`${api}/user/delete`, {
        method: 'delete',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
        credentials:'include'
    }).then(res => {
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });



//************************************************************************************************




export const checkSession = () =>
 fetch(`${api}/user/checkSession`, {
        method: 'get',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        //body: JSON.stringify(payload),
        credentials:'include'
    }).then(res => {
        return res.json();
    })
    .catch(error => {
        console.log("This is error");
        return error;
    });

//************************************************************************************************

//payload = {
//email
//password
//firstname
//lastname
//streetaddress
//city
//zzip code etc
//}
export const doUpdate = (payload) =>
 fetch(`${api}/user/update`, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
        credentials:'include'
    }).then(res => {

        return res.json();
    })
    .catch(error => {
        console.log("This is error");
        return error;
    });

//************************************************************************************************
export const upload = (payload) =>
    fetch(`${api}/user/upload`, {
        method: 'POST',
        body:payload,
        credentials:'include'
    }).then(res => {
        return res.json();
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

//************************************************************************************************
