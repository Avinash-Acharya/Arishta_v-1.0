from flask import Flask, request, jsonify
from transformers import AutoModelForSequenceClassification, AutoTokenizer
import torch

app = Flask(__name__)

# Load the model and tokenizer
model = AutoModelForSequenceClassification.from_pretrained('../models/1')
tokenizer = AutoTokenizer.from_pretrained('../models/1')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    text = data['text']

    # Tokenize and make prediction
    inputs = tokenizer(text, return_tensors='pt')
    with torch.no_grad():
        outputs = model(**inputs)
        logits = outputs.logits

    prediction = logits.argmax().item()
    return jsonify({'prediction': prediction})

if __name__ == '__main__':
    app.run(debug=True)
