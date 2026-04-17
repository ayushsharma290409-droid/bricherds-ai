import { useInternetIdentity } from "@caffeineai/core-infrastructure";

export function useAuth() {
  const { login, clear, loginStatus, identity, isAuthenticated } =
    useInternetIdentity();

  const isLoading = loginStatus === "initializing";
  const principalId = identity?.getPrincipal().toText();

  return {
    isAuthenticated,
    isLoading,
    loginStatus,
    identity,
    principalId,
    login,
    logout: clear,
  };
}
