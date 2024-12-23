package Portfolio.Tracker.Service;

import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;


@Service
public class AlphaVantageAPI {

    private static final String API_KEY = "PK64B7TK3WKUBWBR"; // Replace with your actual API key
    private static final String BASE_URL = "https://www.alphavantage.co/query";

    public String getStockData(String symbol) throws Exception {
        String interval = "5min"; // Time interval (e.g., 1min, 5min, etc.)
        String outputSize = "full"; // Output size (compact or full)

        String urlString = String.format("%s?function=TIME_SERIES_INTRADAY&symbol=%s&interval=%s&outputsize=%s&apikey=%s",
                BASE_URL, symbol, interval, outputSize, API_KEY);

        // Send HTTP request and get response
        String response = sendHttpRequest(urlString);

        // Parse the JSON response
        JSONObject jsonResponse = new JSONObject(response);

        // Extract and print the time series data
        if (jsonResponse.has("Time Series (5min)")) {
            JSONObject timeSeries = jsonResponse.getJSONObject("Time Series (5min)");
            StringBuilder data = new StringBuilder();

            timeSeries.keys().forEachRemaining(key -> {
                JSONObject dataPoint = timeSeries.getJSONObject(key);
                data.append("Timestamp: ").append(key).append("\n")
                        .append("Open: ").append(dataPoint.getString("1. open")).append("\n")
                        .append("High: ").append(dataPoint.getString("2. high")).append("\n")
                        .append("Low: ").append(dataPoint.getString("3. low")).append("\n")
                        .append("Close: ").append(dataPoint.getString("4. close")).append("\n")
                        .append("Volume: ").append(dataPoint.getString("5. volume")).append("\n")
                        .append("----------------------------\n");
            });

            return data.toString();
        } else {
            return "Error: No time series data found for the symbol.";
        }
    }

    private String sendHttpRequest(String urlString) throws Exception {
        URL url = new URL(urlString);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("GET");

        BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
        String inputLine;
        StringBuilder response = new StringBuilder();

        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
        }
        in.close();

        return response.toString();
    }
}
