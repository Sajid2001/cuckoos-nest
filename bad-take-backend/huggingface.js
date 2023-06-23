const fetch =  require('isomorphic-fetch');
const {HfInference} = require('@huggingface/inference')

const hf = new HfInference(process.env.HUGGING_FACE_TOKEN);

const classifyTweets = async(messages, interests) => {
const data = await hf.zeroShotClassification({
    model: 'facebook/bart-large-mnli',
    inputs: messages,
    parameters: { candidate_labels: interests }
  })
  if(data){
    return data;
  }
}  

module.exports = classifyTweets;
