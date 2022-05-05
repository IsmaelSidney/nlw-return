import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy },
    { sendMail: sendMailSpy }
)
describe('Submit feedback', () => {
    it('should be able to submit a feedback', async () => {

        await expect(submitFeedback.execute({
            type: "Bug",
            comment: "Deu erro",
            screenshot: "data:image/png;base64dfdfhimage.jpg"
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    })
})

describe('Submit feedback', () => {
    it('should not be able to submit feedback without a type', async () => {

        await expect(submitFeedback.execute({
            type: "",
            comment: "Deu erro",
            screenshot: "data:image/png;base64dfdfhimage.jpg"
        })).rejects.toThrow();
    })
})

describe('Submit feedback', () => {
    it('should not be able to submit feedback without a comment', async () => {

        await expect(submitFeedback.execute({
            type: "Bug",
            comment: "",
            screenshot: "data:image/png;base64dfdfhimage.jpg"
        })).rejects.toThrow();
    })
})

describe('Submit feedback', () => {
    it('should not be able to submit feedback with a invalid format', async () => {

        await expect(submitFeedback.execute({
            type: "Bug",
            comment: "Deu erro",
            screenshot: "image.jpg"
        })).rejects.toThrow();
    })
})