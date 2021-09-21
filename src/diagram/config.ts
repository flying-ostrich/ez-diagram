import { EzConstraint } from '../model/constraint/constraint';

export const EZ_DIAGGRAM_DEFAULT_CONFIG = {VERTEX_CONSTRAINTS: [
    new EzConstraint(0.5, 0, 0, 0),
    new EzConstraint(1, 0.5, 0, 0),
    new EzConstraint(0.5, 1, 0, 0),
    new EzConstraint(0, 0.5, 0, 0),
]};