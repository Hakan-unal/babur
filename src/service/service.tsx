import axios from 'axios';


type FormValues = {
    content: string,
}



export const postMessage = (payload: FormValues) => axios.post('https://babur.vercel.app/chatgpt', payload)
    .then((response) => {
        return response
    })
    .catch((error) => {
        return error
    })




