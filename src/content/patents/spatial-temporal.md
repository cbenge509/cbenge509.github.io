---
title: "Spatial-temporal memory uncorrectable error prediction system"
patentNumber: "US-2025-0272192A1"
filingDate: 2024-02-23
grantDate: 2025-08-28
url: "https://patents.google.com/patent/US20250272192A1/en"
status: granted
---

Systems and methods are directed to training and using a spatial-temporal transformer to predict memory errors. The system aggregates historical data including error logs from data centers by time windows and generates, from the aggregated historical data, a spatial representation of the errors and a set of micro features for each time window in an observation period. A memory feature vector is generated for each time window by flattening the spatial representation and appending the corresponding set of micro features to an end of the flattened spatial representation. The spatial-temporal transformer is trained by applying the memory feature vector for each time window to a transformer encoder. This training process is repeat for each observation period within a data collection period. During inference time, a similar process is performed to generate inference memory feature vectors for an inference observation period, which are applied to the trained transformer to predict errors.
