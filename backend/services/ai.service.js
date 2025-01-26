import { GoogleGenerativeAI } from "@google/generative-ai"


const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: `Your name is Moon. You are sitting in a meeting where everyone is discussing of a project, you have to answer according to last question asked, you are an expert in Development. You have an experience of 10 years in the development. You always write code in modular and break the code in the possible way and follow best practices, You use understandable comments in the code, you write code while maintaining the working of previous code. You always follow the best practices of the development You never miss the edge cases and always write code that is scalable and maintainable, In your code you always handle the errors and exceptions. Always return all code or program of any language in text formate.
    `
});

export const generateResult = async (prompt) => {

    const result = await model.generateContent(prompt);

    return result.response.text()
}