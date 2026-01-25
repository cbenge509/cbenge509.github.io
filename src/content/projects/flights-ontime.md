---
title: "Flight Delay & Ontime Prediction"
description: "A distributed machine learning system built on Azure Databricks that predicts flight delays by processing large-scale aviation and weather datasets, enabling proactive operational optimization."
image: "../../assets/images/projects/flights_ontime.jpg"
githubUrl: "https://github.com/cbenge509/flightsontime"
liveUrl: "https://cbenge509.github.io/flightsontime"
skills:
  - "Machine Learning at Scale"
  - "Distributed Computing"
  - "Feature Engineering"
  - "Predictive Analytics"
tools:
  - "PySpark"
  - "Azure Databricks"
  - "XGBoost"
  - "TensorFlow"
  - "Python"
category: "research"
affiliation: "UC Berkeley"
isFeatured: true
publishDate: 2020-05-15
order: 3
---

Flight delays create cascading problems across the aviation industry — disrupted schedules, passenger inconvenience, and significant economic losses for airlines and airports alike. This project tackles the challenge of predicting delays before they occur, enabling proactive optimization of operations.

## The Challenge

Aviation delays are influenced by a complex interplay of factors: weather conditions, airport congestion, aircraft availability, and seasonal patterns. Traditional reactive approaches leave airlines scrambling to manage disruptions after they've already begun. The goal was to build a predictive system capable of processing massive datasets to forecast delay probability with sufficient lead time for operational intervention.

## Approach

Working with large-scale flight, weather, and station data, the team engineered features from multiple data sources and trained machine learning models using distributed computing on Microsoft Azure Databricks. The pipeline included:

- **Data Integration**: Merging flight records with weather observations and airport station data
- **Feature Engineering**: Creating temporal, geographic, and weather-derived predictors
- **Model Development**: Implementing logistic regression baselines, PySpark ML models with cross-validation, and feed-forward neural networks
- **Evaluation**: Rigorous cross-validation to assess generalization performance

## Technical Implementation

The project leveraged PySpark for distributed data processing, enabling analysis at a scale impossible with single-machine approaches. XGBoost and TensorFlow models were trained and evaluated, with hyperparameter tuning performed through cross-validation. Visualization tools including Plotly, Seaborn, and Matplotlib supported exploratory analysis and results communication.

## Team

This project was completed as part of UC Berkeley's W261 (Machine Learning at Scale) course in collaboration with Ning (Louis) Li, Andrew Fogarty, and Siduo (Stone) Jiang.
