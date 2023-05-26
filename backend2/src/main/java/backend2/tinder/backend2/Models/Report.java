package backend2.tinder.backend2.Models;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.*;
import lombok.*;


@Entity(name = "Report")
@Table(name = "report", uniqueConstraints = @UniqueConstraint(columnNames = {"reported_user_id", "reporting_user_id"}))
// @Table(name = "report")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false)
    private long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "reported_user_id", referencedColumnName = "id")
    private Users reportedUser;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "reporting_user_id", referencedColumnName = "id")
    private Users reportingUser;


    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    @CreationTimestamp
    @Column(name = "created_date")
    private LocalDateTime createdDate;


    public Report(Users reportedUser, Users reportingUser) {
        this.reportedUser = reportedUser;
        this.reportingUser = reportingUser;
    }


    
}
