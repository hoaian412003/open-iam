import '@xyflow/react/dist/style.css';
import { ScopeBuild } from './components/ScopeBuild';
import { getScopes } from './action/get';
import { getCredentialProviders } from '../credentials/actions/get';

export default async function ScopePage() {

  const scopes = await getScopes();
  const credentialProvider = await getCredentialProviders();

  return <ScopeBuild scopes={scopes} groups={credentialProvider.map(p => p.name)} />
}
