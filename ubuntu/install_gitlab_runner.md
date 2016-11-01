### Install using official GitLab repositories

Currently we support Debian, Ubuntu and CentOS.

If you want to use Docker runner, install it before using the multi runner:

```bash
curl -sSL https://get.docker.com/ | sh
```

Add GitLab's official repository via apt-get or yum:

```bash
# For Debian/Ubuntu
curl -L https://packages.gitlab.com/install/repositories/runner/gitlab-ci-multi-runner/script.deb.sh | sudo bash

# For CentOS
curl -L https://packages.gitlab.com/install/repositories/runner/gitlab-ci-multi-runner/script.rpm.sh | sudo bash
```

---
**APT pinning - Debian only**

Since Debian Stretch, Debian maintainers added their native package
with the same name as is used by our package. And by default the official
repositories will have a priority.

If you want to use our package you should manually set the source of
the package. The best would be to add the pinning configuration file.
Thanks to this every next update of the Runner's package - whether it will
be done manually or automatically - will be done using the same source:

```bash
cat > /etc/apt/preferences.d/pin-gitlab-runner.pref <<EOF
Explanation: Prefer GitLab provided packages over the Debian native ones
Package: gitlab-ci-multi-runner
Pin: origin packages.gitlab.com
Pin-Priority: 1001
EOF
```
---

Install `gitlab-ci-multi-runner`:

```bash
# For Debian/Ubuntu
sudo apt-get install gitlab-ci-multi-runner

# For CentOS
sudo yum install gitlab-ci-multi-runner
```

Register the runner (Look into [runners documentation](http://doc.gitlab.com/ce/ci/runners/README.html) to learn how to obtain a token):

```bash
sudo gitlab-ci-multi-runner register

Please enter the gitlab-ci coordinator URL (e.g. https://gitlab.com )
https://gitlab.com
Please enter the gitlab-ci token for this runner
xxx
Please enter the gitlab-ci description for this runner
my-runner
INFO[0034] fcf5c619 Registering runner... succeeded
Please enter the executor: shell, docker, docker-ssh, ssh?
docker
Please enter the Docker image (eg. ruby:2.1):
ruby:2.1
INFO[0037] Runner registered successfully. Feel free to start it, but if it's
running already the config should be automatically reloaded!
```

The runner should be started already and you are ready to build your projects!

Make sure that you read the [FAQ](../faq/README.md) section which describes
some of the most common problems with GitLab Runner.

### Update

Simply execute to install latest version:

```bash
# For Debian/Ubuntu
sudo apt-get update
sudo apt-get install gitlab-ci-multi-runner

# For CentOS
sudo yum update
sudo yum install gitlab-ci-multi-runner
```