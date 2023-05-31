
package com.koreait.koreaitsugang.security;

import com.koreait.koreaitsugang.aop.annotation.ParamsAspect;
import com.koreait.koreaitsugang.entity.UserMst;
import com.koreait.koreaitsugang.repository.AccountRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class PrincipalDetailsService implements UserDetailsService {

    @Autowired
    private AccountRepository accountRepository;

    @ParamsAspect
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        UserMst user = accountRepository.findUserByUsername(username);

        if (user == null) {
            throw new UsernameNotFoundException("회원정보를 확인할 수 없음");
        }

        return new PrincipalDetails(user);
    }
}
