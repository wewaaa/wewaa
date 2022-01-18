package com.wewaa.backend.image.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "IMAGE")
public class Image {

    @JsonIgnore
    @Id
    @Column(name = "IMAGE_SEQ")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long imageSeq;


}
