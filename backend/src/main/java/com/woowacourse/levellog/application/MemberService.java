package com.woowacourse.levellog.application;

import com.woowacourse.levellog.authentication.exception.MemberNotFoundException;
import com.woowacourse.levellog.domain.Member;
import com.woowacourse.levellog.domain.MemberRepository;
import com.woowacourse.levellog.dto.MemberCreateDto;
import com.woowacourse.levellog.dto.MemberResponse;
import com.woowacourse.levellog.dto.MembersResponse;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    public Long save(final MemberCreateDto memberCreateDto) {
        final Member member = new Member(memberCreateDto.getNickname(), memberCreateDto.getGithubId(),
                memberCreateDto.getProfileUrl());
        final Member savedMember = memberRepository.save(member);
        return savedMember.getId();
    }

    public Optional<Member> findByGithubId(final int githubId) {
        return memberRepository.findByGithubId(githubId);
    }

    public Member getById(final Long id) {
        return memberRepository.findById(id)
                .orElseThrow(MemberNotFoundException::new);
    }

    public void updateProfileUrl(final Long id, final String profileUrl) {
        final Member member = memberRepository.findById(id)
                .orElseThrow();
        member.updateProfileUrl(profileUrl);
    }

    public MembersResponse findAll() {
        final List<MemberResponse> responses = memberRepository.findAll().stream()
                .map(it -> new MemberResponse(it.getId(), it.getNickname(), it.getProfileUrl()))
                .collect(Collectors.toList());

        return new MembersResponse(responses);
    }
}