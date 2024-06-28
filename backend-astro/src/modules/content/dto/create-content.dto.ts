export class CreateContentDto {
  readonly title: string;
  readonly body: string;
  readonly imatge: string;
  readonly author?: string;
  readonly tags?: string[];
}
