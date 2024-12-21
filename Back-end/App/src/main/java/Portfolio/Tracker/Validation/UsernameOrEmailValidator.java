package Portfolio.Tracker.Validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class UsernameOrEmailValidator implements ConstraintValidator<Portfolio.Tracker.Validation.UsernameOrEmail, String> {

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null || value.isBlank()) {
            return false; // Input cannot be blank
        }

        // Validate as email if input contains '@'
        if (value.contains("@")) {
            return value.matches("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$");
        }

        // If not an email, assume it's a valid username (non-empty and alphanumeric)
        return value.matches("^[A-Za-z0-9_]+$");
    }
}
