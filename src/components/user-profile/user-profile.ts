import { LitElement, html } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ApolloMutationController, ApolloQueryController } from '@apollo-elements/core';

import { UserProfile } from './UserProfile.query.graphql';
import { UpdateProfile } from './UpdateProfile.mutation.graphql';

import style from './user-profile.css';

@customElement('user-profile')
export class UserProfileElement extends LitElement {
  static styles = style;

  query = new ApolloQueryController(this, UserProfile);
  muttn = new ApolloMutationController(this, UpdateProfile, {
    update(cache, result) {
      const query = UserProfile;
      const existing = cache.readQuery({ query });
      cache.writeQuery({
        query,
        data: {
          ...existing,
          profile: {
            ...existing.profile,
            name: result.data?.updateProfile?.name ?? existing.profile?.name,
          },
        },
      });
    },
  });

  @query('sl-input') input: HTMLInputElement;

  render() {
    const { data, loading } = this.query;
    return html`
      <header>
        <h2 class=${classMap({ loading })}>
          Welcome, ${data?.profile?.name}!
        </h2>
      </header>

      <sl-input label="Username"
                value="${data?.profile?.name}"
                .disabled="${loading}"></sl-input>

      <sl-button type="primary"
                 .disabled=${loading}
                 @click=${this.onClickSave}>Save</sl-button>
    `;
  }

  onClickSave() {
    this.muttn.mutate({ variables: { user: { name: this.input.value } } });
  }
}
