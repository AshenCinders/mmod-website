import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LocalUserService } from '../../services/data/local-user.service';

/**
 * Redirects `/profile` to `/profile/<logged-in-ID>` if has a logged in user,
 * otherwise to home page.
 */
@Component({
  selector: 'm-profile-redirect-local',
  template: ''
})
export class ProfileRedirectComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly localUserService = inject(LocalUserService);

  async ngOnInit(): Promise<void> {
    const localUser = this.localUserService.user.value;

    await this.router.navigate(
      [localUser?.id ? `/profile/${localUser.id}` : '/'],
      // Enables backwards navigation; otherwise gets stuck in loop.
      {
        replaceUrl: true
      }
    );
  }
}
