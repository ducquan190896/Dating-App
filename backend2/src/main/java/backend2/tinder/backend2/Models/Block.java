package backend2.tinder.backend2.Models;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.*;
import lombok.*;


@Entity(name = "Block")
@Table(name = "block", uniqueConstraints = @UniqueConstraint(columnNames = {"blocked_user_id", "blocking_user_id"}))
// @Table(name = "block")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Block {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false)
    private Long id;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "blocked_user_id", referencedColumnName = "id")
    private Users blockedUser;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "blocking_user_id", referencedColumnName = "id")
    private Users blockingUser;


    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    @CreationTimestamp
    @Column(name = "created_date")
    private LocalDateTime createdDate;


    public Block(Users blockedUser, Users blockingUser) {
        this.blockedUser = blockedUser;
        this.blockingUser = blockingUser;
    }


    @Override
    public String toString() {
        return "Block [id=" + id + ", blockedUser=" + blockedUser.getUsername() + ", blockingUser=" + blockingUser.getUsername() + ", createdDate="
                + createdDate + "]";
    }


    
}
