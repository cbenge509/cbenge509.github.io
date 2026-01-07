---
title: "College Outcomes Prediction"
description: "Regression analysis predicting college graduate earnings using U.S. Department of Education data. 1st place finish with 2.9796 RMSE."
image: "../../assets/images/projects/college_outcomes.jpg"
githubUrl: "https://github.com/cbenge509/DataScienceCapstone_Oct2017"
skills:
  - "Regression"
  - "Ensemble Methods"
  - "Feature Engineering"
  - "Data Analysis"
tools:
  - "Python"
  - "XGBoost"
  - "LightGBM"
  - "Scikit-learn"
category: "winner"
achievement: "1st Place (RMSE: 2.9796)"
affiliation: "DrivenData"
isFeatured: true
publishDate: 2017-10-15
order: 6
---

Regression analysis predicting college graduate earnings using anonymized data from the U.S. Department of Education College Scorecard.

## Competition

DrivenData Machine Learning Competition evaluating 17,107 post-collegiate outcomes across 297 variables to construct predictions for 9,912 test samples.

## Key Findings

Notable discoveries included that "public, nonprofit" school status and Ph.D. program presence were strong positive income indicators, while culinary programs and "private, for-profit" status correlated with lower earnings.

## Approach

Applied generalized stacking of seven tree-based models (AdaBoost, Extra Trees, Random Forest, Gradient Boosted Decision Trees, LightGBM, XGBoost) with quadratic feature interactions, missing data interpolation, outlier management, and ordinal ranking of states and demographics.
