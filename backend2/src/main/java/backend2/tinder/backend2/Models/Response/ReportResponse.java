package backend2.tinder.backend2.Models.Response;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReportResponse {
    private long id;
    private UserResponse reportedUser;
    private UserResponse reportingUser;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime createdDate;
    @Override
    public String toString() {
        return "ReportResponse [id=" + id + ", reportedUser=" + reportedUser + ", reportingUser=" + reportingUser
                + ", createdDate=" + createdDate + "]";
    }

    
}
