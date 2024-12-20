package Portfolio.Tracker.Configuration;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.FilterConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Collections;


@WebFilter("/*") // Applies to all URLs
public class LoggingFilter implements Filter {

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        // Initialization logic if needed
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        // Log all headers to see what is sent by the client
        System.out.println("Headers: " + Collections.list(httpRequest.getHeaderNames()));
        System.out.println("Accept header: " + httpRequest.getHeader("Accept"));
        chain.doFilter(request, response); // Continue the filter chain
    }

    @Override
    public void destroy() {
        // Cleanup logic if needed
    }
}
