import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import style from './user-profile.css';

@customElement('user-profile')
export class UserProfileElement extends LitElement {
  static styles = style;

  render() {
    return html`
      <header>
        <h2>
          Welcome
        </h2>
      </header>
    `;
  }
}
