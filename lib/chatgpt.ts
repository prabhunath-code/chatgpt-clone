import { Configuration,OpenAIApi } from "openai";


// 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

const configuration=new Configuration({
    apiKey:process.env.OPENAI_API_KEY,

})

const openai=new OpenAIApi(configuration)

export default openai