import { MprDataDto } from '../mpr/mpr.dto'

export const apiDocs = {
  default: {
    operation: {
      summary: 'API Check',
      description: 'Just a dummy request to make sure the API is running',
    },
    ok: { description: 'The API is up and running!' },
  },
  mpr: {
    currentState: {
      operation: {
        summary: 'MPR current state',
        description: 'Get the current profile and config of MPR',
      },
      ok: {
        type: MprDataDto,
        description: 'The currently active profile and MPR config',
      },
      error: {
        internalServerError: { description: 'Failed to read or parse the required files' },
      },
    },
    changeProfile: {
      operation: {
        summary: 'Change mouse profile',
        description: 'Change mouse profile to default or a game',
      },
      ok: {
        type: MprDataDto,
        description: 'The currently active profile and MPR config',
      },
      error: {
        badRequest: { description: 'Invalid request parameters' },
        internalServerError: {
          description:
            'Failed to read or parse the required config files, or the shell script run failed',
        },
      },
    },
  },
}
