package Portfolio.Tracker.Service;

import Portfolio.Tracker.Entity.LoginActivity;
import Portfolio.Tracker.Entity.User;
import Portfolio.Tracker.Repository.LoginActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class LoginActivityService {

    @Autowired
    private LoginActivityRepository loginActivityRepository;

    
    public void recordLogin(User user) {
        LocalDate today = LocalDate.now();
        LoginActivity activity = loginActivityRepository.findByUserAndDate(user, today)
                .orElse(new LoginActivity());
        activity.setUser(user);
        activity.setDate(today);
        activity.setCount(activity.getCount() + 1); // Increment count
        loginActivityRepository.save(activity);
    }

    public List<LoginActivity> getLoginActivity(User user) {
        return loginActivityRepository.findByUserOrderByDateAsc(user);
    }
}