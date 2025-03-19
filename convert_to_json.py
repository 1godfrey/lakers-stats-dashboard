import pandas as pd

# Load the CSV file
df = pd.read_csv('lakers_stats.csv')

# Convert DataFrame to JSON and save it
df.to_json('lakers_stats.json', orient='records')

print("JSON file successfully created: lakers_stats.json")
