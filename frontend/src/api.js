const BASE_URL = 'http://localhost:8080';

export const GetAllEmployees = async (search = '', page = 1, limit = 4) => {
    const url =
    `${BASE_URL}/api/employees?search=${search}&page=${page}&limit=${limit}`;

try {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const result = await fetch(url, options);
    const  data  = await result.json();
    return data;
} catch (err)
{
return err;
}
}

export const CreateEmployee = async(empObj) => {
    const url =
    `${BASE_URL}/api/employees`;

try {
     // Create a FormData object
     const formData = new FormData();
 // Append all fields to the FormData object
 for (const key in empObj) {
    formData.append(key, empObj[key]);
}
// FormData handles the headers and content type
    const options = {
        method: 'POST',
            // 'Content-Type': 'application/json',
        body: formData
        // body:JSON.stringify(empObj)
    };
    const result = await fetch(url, options);
    const  data  = await result.json();
    return data;
} catch (err)
{
return err;
}
}


export const UpdateEmployeeById = async (empObj, id) => {
    const url = `${BASE_URL}/api/employees/${id}`;
    console.log('url ', url);
    // Create a FormData object
    const formData = new FormData();

    // Append all fields to the FormData object
    for (const key in empObj) {
        formData.append(key, empObj[key]);
    }
    // FormData handles the headers and content type
    const options = {
        method: 'PUT',
        body: formData
    };
    try {
        const result = await fetch(url, options);
        const data = await result.json();
        console.log('<---update--> ', data);
        return data;
    } catch (err) {
        return err;
    }
};

export const DeleteEmployeeById = async (id) => {
    const url =
        `${BASE_URL}/api/employees/${id}`;
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const result = await fetch(url, options);
        const data = await result.json();
        console.log(data);
        return data;
    } catch (err) {
        return err;
    }
}