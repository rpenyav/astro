export class CreateContentDto {
  readonly title: string;
  readonly body: string;
  readonly author?: string;
  readonly tags?: string[];
}
