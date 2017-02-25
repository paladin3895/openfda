npm run build && cat data/openfda.drugId.csv | xargs -L 1 node build/lookupDrug.js
