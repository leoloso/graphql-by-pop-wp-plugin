<?php

declare(strict_types=1);

namespace GraphQLAPI\GraphQLAPI\Services\EndpointExecuters;

use GraphQLAPI\GraphQLAPI\Constants\RequestParams;
use GraphQLAPI\GraphQLAPI\ModuleResolvers\ClientFunctionalityModuleResolver;
use GraphQLAPI\GraphQLAPI\Services\Clients\CustomEndpointVoyagerClient;
use GraphQLAPI\GraphQLAPI\Services\EndpointAnnotators\ClientEndpointAnnotatorInterface;
use GraphQLAPI\GraphQLAPI\Services\EndpointAnnotators\VoyagerClientEndpointAnnotator;
use GraphQLByPoP\GraphQLClientsForWP\Clients\AbstractClient;
use Symfony\Contracts\Service\Attribute\Required;

class VoyagerClientEndpointExecuter extends AbstractClientEndpointExecuter implements CustomEndpointExecuterServiceTagInterface
{
    private ?CustomEndpointVoyagerClient $customEndpointVoyagerClient = null;
    private ?VoyagerClientEndpointAnnotator $voyagerClientEndpointAnnotator = null;

    public function setCustomEndpointVoyagerClient(CustomEndpointVoyagerClient $customEndpointVoyagerClient): void
    {
        $this->customEndpointVoyagerClient = $customEndpointVoyagerClient;
    }
    protected function getCustomEndpointVoyagerClient(): CustomEndpointVoyagerClient
    {
        return $this->customEndpointVoyagerClient ??= $this->instanceManager->getInstance(CustomEndpointVoyagerClient::class);
    }
    public function setVoyagerClientEndpointAnnotator(VoyagerClientEndpointAnnotator $voyagerClientEndpointAnnotator): void
    {
        $this->voyagerClientEndpointAnnotator = $voyagerClientEndpointAnnotator;
    }
    protected function getVoyagerClientEndpointAnnotator(): VoyagerClientEndpointAnnotator
    {
        return $this->voyagerClientEndpointAnnotator ??= $this->instanceManager->getInstance(VoyagerClientEndpointAnnotator::class);
    }

    //#[Required]
    final public function autowireVoyagerClientEndpointExecuter(
        CustomEndpointVoyagerClient $customEndpointVoyagerClient,
        VoyagerClientEndpointAnnotator $voyagerClientEndpointAnnotator,
    ): void {
        $this->customEndpointVoyagerClient = $customEndpointVoyagerClient;
        $this->voyagerClientEndpointAnnotator = $voyagerClientEndpointAnnotator;
    }

    public function getEnablingModule(): ?string
    {
        return ClientFunctionalityModuleResolver::INTERACTIVE_SCHEMA_FOR_CUSTOM_ENDPOINTS;
    }

    protected function getView(): string
    {
        return RequestParams::VIEW_SCHEMA;
    }

    protected function getClient(): AbstractClient
    {
        return $this->getCustomEndpointVoyagerClient();
    }

    protected function getClientEndpointAnnotator(): ClientEndpointAnnotatorInterface
    {
        return $this->getVoyagerClientEndpointAnnotator();
    }
}
