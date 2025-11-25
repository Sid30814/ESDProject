package com.example.tutorial.DTO;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DomainDto {
    private Long id;
    private String name;
}
