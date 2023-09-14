import axios from 'axios';


type FormValues = {
    content: string,
}



export const postMessage = (payload: FormValues) => axios.post('https://supabase-puce.vercel.app/chatgpt', payload)
    .then((response) => {
        return response.data.message
    })
    .catch((error) => {
        return error
    })




