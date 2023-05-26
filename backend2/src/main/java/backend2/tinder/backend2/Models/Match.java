package backend2.tinder.backend2.Models;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.boot.context.properties.bind.Name;

import jakarta.persistence.*;
import lombok.*;


@Entity(name = "Match")
@Table(name = "match", uniqueConstraints = @UniqueConstraint(columnNames = {"user1_id", "user2_id"}))
// @Table(name = "match")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Match {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user1_id", referencedColumnName = "id")
    private Users user1;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user2_id", referencedColumnName = "id")
    private Users user2;

    @Column(name = "is_blocked")
    private boolean isBlocked;

    @CreationTimestamp
    @Column(name = "created_date")
    private LocalDateTime createdDate;

    @UpdateTimestamp
    @Column(name = "updated_date")
    private LocalDateTime updatedDate;

    public boolean getIsBlock() {
        return this.isBlocked;
    }

    public void setIsBlock(boolean block) {
        this.isBlocked = block;
    }

    public Match(Users user1, Users user2) {
        this.user1 = user1;
        this.user2 = user2;
        this.isBlocked = false;
    }

    
}
