const fetch =  require('isomorphic-fetch');
const {HfInference} = require('@huggingface/inference')

const hf = new HfInference(process.env.HUGGING_FACE_TOKEN);

const classifyTweetsByText = async(messages, interests) => {
const data = await hf.zeroShotClassification({
    model: 'facebook/bart-large-mnli',
    inputs: messages,
    parameters: { candidate_labels: interests }
  })
  if(data){
    return data;
  }
}  

const classifyTweetsByImage = async (images, interests) => {
  try {
    const classificationPromises = images.map(async (imageUrl) => {
      const response = await fetch(imageUrl);
      const imageBlob = await response.blob();

      const data = await hf.zeroShotImageClassification({
        model: 'openai/clip-vit-large-patch14-336',
        inputs: {
          image: imageBlob,
        },
        parameters: { candidate_labels: interests },
      });

      const scores = data.map((item) => item.score);

      return {
        sequence: imageUrl,
        labels: interests,
        scores: scores,
      };
    });

    const results = await Promise.all(classificationPromises);
    return results;
  } catch (error) {
    console.error('Error classifying images:', error);
    // Handle the error if needed
    return [];
  }
};







// const messages = [
//   'Jalen Bruson will be a star',
//   'Lebron needs to retire',
//   'Iphones are terrible'
// ]

// const images = [
//   'https://storage.googleapis.com/cuckoos-nest/Screenshot%20(14).png',
// ];

// const interests = ['Anime', 'Manga'];


// classifyTweetsByImage(images, interests)
// .then(result => {
//   console.log(result);
// })
// .catch(err => {
//   console.log(err);
// })

// classifyTweetsByText(messages, interests)
// .then(result => {
//   console.log(result);
// })
// .catch(err => {
//   console.log(err);
// })



module.exports = {classifyTweetsByText, classifyTweetsByImage}
