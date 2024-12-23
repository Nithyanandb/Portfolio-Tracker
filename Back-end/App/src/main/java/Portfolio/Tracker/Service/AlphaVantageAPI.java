package Portfolio.Tracker.Service;

import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class AlphaVantageAPI {

    private static final String API_KEY = "PK64B7TK3WKUBWBR"; // Replace with your actual API key
    private static final String BASE_URL = "https://www.alphavantage.co/query";

    public static void main(String[] args) {
        String symbol = "IBM"; // Example stock symbol
        String interval = "5min"; // Time interval (e.g., 1min, 5min, etc.)
        String outputSize = "full"; // Output size (compact or full)

        try {
            // Construct the API URL
            String urlString = String.format("%s?function=TIME_SERIES_INTRADAY&symbol=%s&interval=%s&outputsize=%s&apikey=%s",
                    BASE_URL, symbol, interval, outputSize, API_KEY);

            // Send HTTP request and get response
            String response = sendHttpRequest(urlString);

            // Parse the JSON response
            JSONObject jsonResponse = new JSONObject(response);

            // Extract and print the time series data
            if (jsonResponse.has("Time Series (5min)")) {
                JSONObject timeSeries = jsonResponse.getJSONObject("Time Series (5min)");
                timeSeries.keys().forEachRemaining(key -> {
                    JSONObject dataPoint = timeSeries.getJSONObject(key);
                    System.out.println("Timestamp: " + key);
                    System.out.println("Open: " + dataPoint.getString("1. open"));
                    System.out.println("High: " + dataPoint.getString("2. high"));
                    System.out.println("Low: " + dataPoint.getString("3. low"));
                    System.out.println("Close: " + dataPoint.getString("4. close"));
                    System.out.println("Volume: " + dataPoint.getString("5. volume"));
                    System.out.println("----------------------------");
                });
            } else {
                System.out.println("Error: " + jsonResponse.toString());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private static String sendHttpRequest(String urlString) throws Exception {
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
